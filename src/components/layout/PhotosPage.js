import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { readPhotoMetadata } from '../../util/PhotoMetadata';
import PhotoCollections from '../../data/PhotoCollections';
import { getFullUrlForImage, getFullUrlForHeaderImage, getFullUrlForViewerImage, getPhotoSrcSet, photoGridSizes } from '../../util/PhotoActions';
import NotFound from './NotFound';
import Masonry from '../photos/Masonry';
import { PhotoShell, BackLink, Eyebrow, PageHeading, Description, ImageFrame } from '../photos/PhotoStyles';

const CollectionHeader = styled.header`
  padding: 10px 0 44px;
  p:last-child { margin-top: 12px; }
`;
const Tile = styled(Link)`
  display: block; padding: 0; border: 0; background: none; color: inherit;
  text-align: left; text-decoration: none; cursor: pointer; font: inherit;
  > span { display: block; padding: 12px 0 4px; color: #888; font-size: 11px; letter-spacing: .08em; }
  img { transition: opacity .2s; }
  &:hover img { opacity: .85; }
  @media (prefers-reduced-motion: reduce) { img { transition: none; } }
`;
const ViewerChrome = createGlobalStyle`
  .navbar, .footer { display: none; }
`;
const Viewer = styled.div`
  position: fixed; inset: 0; z-index: 30;
  box-sizing: border-box; padding: 8px 24px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex; flex-direction: column;
  a:focus, button:focus { outline: none; }
  a:focus-visible, button:focus-visible, summary:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.current}; outline-offset: 3px;
  }
  @media (max-width: 600px) { padding: 6px 10px max(6px, env(safe-area-inset-bottom)); }
`;
const ViewerHeader = styled.header`
  flex-shrink: 0; min-height: 34px;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding-bottom: 8px;
  ${BackLink} { margin: 0; padding: 6px 0; }
  > span { font-size: 12px; color: #888; }
`;
const Stage = styled.section`
  flex: 1; min-height: 0; width: 100%; overflow-y: auto; overflow-x: hidden;
  position: relative; outline: none;
  scroll-snap-type: y mandatory; overscroll-behavior: contain;
  touch-action: pan-y pinch-zoom;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;
const ScrollStep = styled.div`
  height: 100%; width: 100%; scroll-snap-align: start; scroll-snap-stop: always;
`;
const PhotoOverlay = styled.div`
  position: sticky; top: 0; height: 0; width: 100%; z-index: 1;
`;
const Slide = styled.div`
  position: absolute; top: 0; left: 0; width: 100%; height: var(--photo-height, 100vh);
  opacity: 0; pointer-events: none;
  &[data-active='true'] { pointer-events: auto; }
  > a { display: block; position: relative; width: 100%; height: 100%; }
  img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: contain; user-select: none; -webkit-user-drag: none; }
`;
const LoadingMessage = styled.span`
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  color: #888; font-size: 13px; letter-spacing: .02em;
  &[data-preview='true'] {
    top: auto; bottom: 12px; padding: 5px 9px; width: fit-content; margin: 0 auto;
    background: ${({ theme }) => theme.colors.background}; font-size: 11px;
  }
`;
const Metadata = styled.div`
  flex-shrink: 0; min-height: 24px; box-sizing: border-box; padding-top: 6px;
  text-align: center; font-size: 11px; color: #777; line-height: 1.6;
  @media (max-width: 600px) { min-height: 42px; }

`;
const Controls = styled.div`
  flex-shrink: 0; display: flex; flex-direction: column; align-items: center;
  font-size: 12px; color: #777;
  > div { display: flex; align-items: center; gap: 18px; }
  > small { display: none; font-size: 10px; padding: 0 0 3px; color: #888; }
  button { border: 0; background: none; color: #444; cursor: pointer; padding: 6px 14px; min-height: 36px; font-size: 18px; }
  button:disabled { opacity: .25; cursor: default; }
  @media (pointer: coarse), (max-width: 600px) {
    button { min-height: 44px; }
    > small { display: block; }
  }
`;

function PhotoMetadata({ collection, page }) {
  const url = getFullUrlForImage(collection.content[page - 1], collection.imageFolder);
  const [metadata, setMetadata] = useState('');
  useEffect(() => {
    let cancelled = false;
    setMetadata('');
    readPhotoMetadata(url).then(text => { if (!cancelled) setMetadata(text); });
    return () => { cancelled = true; };
  }, [url]);
  return <Metadata aria-label="Photo metadata">{metadata}</Metadata>;
}

function Collection({ collection }) {
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  const selectedName = new URLSearchParams(location.search).get('photo');
  const page = collection.content.indexOf(selectedName) + 1;
  const single = page > 0;
  const count = collection.content.length;
  const pageRef = useRef(page);
  pageRef.current = page;
  const lastSelected = useRef(0);
  if (single) lastSelected.current = page;
  const stage = useRef(null);
  const tiles = useRef([]);
  const suppressClickUntil = useRef(0);
  const requestedPage = useRef(null);
  const layers = useRef([]);
  const initialized = useRef(false);
  const navigation = useRef(null);
  const returnKeyboardFocus = useRef(false);
  const previews = useRef(new Map());
  const [requestedPhotos, setRequestedPhotos] = useState(() => new Set());
  const [loadedPhotos, setLoadedPhotos] = useState(() => new Set());
  const [failedPhotos, setFailedPhotos] = useState(() => new Set());
  const [viewerWidth] = useState(() => window.innerWidth <= 600 ? 1280 : 2048);
  useEffect(() => {
    if (!single || !loadedPhotos.has(page)) return;
    const connection = navigator.connection;
    if (connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType))) return;
    setRequestedPhotos(previous => {
      const next = new Set(previous);
      for (let number = Math.max(1, page - 1); number <= Math.min(count, page + 2); number += 1) next.add(number);
      return next.size === previous.size ? previous : next;
    });
  }, [single, page, count, loadedPhotos]);
  const openFromGrid = (event, index) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    returnKeyboardFocus.current = event.detail === 0;
    tiles.current.forEach((tile, number) => {
      const image = tile && tile.querySelector('img');
      if (image && image.complete && image.naturalWidth) previews.current.set(number + 1, image.currentSrc || image.src);
    });
    event.preventDefault();
    history.push(photoUrl(index + 1));
  };
  const photoUrl = useCallback(index => `${pathname}?photo=${encodeURIComponent(collection.content[index - 1])}`, [pathname, collection]);
  // Replace within the viewer so browser Back returns to the collection grid,
  // rather than stepping backwards through every photograph viewed.
  const updateLayers = useCallback((position, brightness) => {
    const element = stage.current;
    if (!element || !element.clientHeight) return;
    element.style.setProperty('--photo-height', `${element.clientHeight}px`);
    const offset = typeof position === 'number' ? position : element.scrollTop / element.clientHeight;
    const nearest = Math.round(offset);
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    layers.current.forEach((layer, index) => {
      if (!layer) return;
      const opacity = typeof brightness === 'number' ? (index === nearest ? brightness : 0)
        : reduced ? Number(index === nearest) : Math.max(0, 1 - Math.abs(offset - index) * 2);
      layer.style.opacity = String(opacity);
      layer.dataset.active = String(index === nearest);
    });
  }, []);
  const cancelNavigation = useCallback(() => {
    const running = navigation.current;
    if (running) {
      cancelAnimationFrame(running.frame);
      running.element.style.scrollSnapType = running.snap;
      navigation.current = null;
    }
    requestedPage.current = null;
  }, []);
  const interruptNavigation = useCallback(() => {
    cancelNavigation();
    updateLayers();
    const element = stage.current;
    if (element && element.clientHeight) {
      const current = Math.max(1, Math.min(count, Math.round(element.scrollTop / element.clientHeight) + 1));
      if (current !== pageRef.current) {
        pageRef.current = current;
        history.replace(photoUrl(current));
      }
    }
  }, [cancelNavigation, updateLayers, count, history, photoUrl]);
  const goToPage = useCallback(next => {
    const target = Math.max(1, Math.min(count, next));
    const element = stage.current;
    if (!element || target === pageRef.current) return;
    // Retarget a rapid series of key presses from the currently visible layer.
    let from = Math.round(element.scrollTop / element.clientHeight) || 0;
    let initialOpacity = 0;
    layers.current.forEach((layer, index) => {
      const opacity = layer ? Number(layer.style.opacity) : 0;
      if (opacity > initialOpacity) { initialOpacity = opacity; from = index; }
    });
    cancelNavigation();
    requestedPage.current = target;
    pageRef.current = target;
    history.replace(photoUrl(target));
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !element.clientHeight) {
      element.scrollTop = (target - 1) * element.clientHeight;
      requestedPage.current = null;
      updateLayers();
      return;
    }
    const running = { element, snap: element.style.scrollSnapType, frame: null };
    navigation.current = running;
    element.style.scrollSnapType = 'none';
    let started;
    const duration = 450;
    const tick = now => {
      if (navigation.current !== running) return;
      if (started === undefined) started = now;
      const progress = Math.min(1, (now - started) / duration);
      // Same fade-out/fade-in curve as a complete scroll, with controlled timing.
      const half = progress < .5 ? progress * 2 : (progress - .5) * 2;
      const eased = half * half * (3 - 2 * half);
      if (progress < .5) updateLayers(from, (initialOpacity || 1) * (1 - eased));
      else {
        element.scrollTop = (target - 1) * element.clientHeight;
        updateLayers(target - 1, eased);
      }
      if (progress < 1) running.frame = requestAnimationFrame(tick);
      else {
        element.style.scrollSnapType = running.snap;
        navigation.current = null;
        requestedPage.current = null;
        updateLayers();
      }
    };
    running.frame = requestAnimationFrame(tick);
  }, [count, history, photoUrl, updateLayers, cancelNavigation]);
  useEffect(() => {
    if (!single) cancelNavigation();
    return cancelNavigation;
  }, [single, cancelNavigation]);
  const handleScroll = () => {
    if (navigation.current) return;
    updateLayers();
    const element = stage.current;
    if (!element || !element.clientHeight) return;
    const offset = element.scrollTop / element.clientHeight;
    if (requestedPage.current !== null) {
      if (Math.abs(offset - (requestedPage.current - 1)) < 0.01) requestedPage.current = null;
      else return;
    }
    const next = Math.max(1, Math.min(count, Math.round(offset) + 1));
    if (next !== pageRef.current) {
      pageRef.current = next;
      history.replace(photoUrl(next));
    }
  };
  useLayoutEffect(() => {
    if (!single) { initialized.current = false; return; }
    if (!initialized.current) {
      stage.current.scrollTop = (page - 1) * stage.current.clientHeight;
      initialized.current = true;
      updateLayers();
    }
  }, [single, page, updateLayers]);
  useEffect(() => {
    if (!single || typeof ResizeObserver === 'undefined') return;
    const element = stage.current;
    const observer = new ResizeObserver(() => {
      cancelNavigation();
      element.scrollTop = (pageRef.current - 1) * element.clientHeight;
      updateLayers();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [single, updateLayers, cancelNavigation]);
  const backToGrid = useCallback(() => { history.replace(pathname); }, [history, pathname]);

  useEffect(() => {
    if (single) window.scrollTo(0, 0);
    const frame = requestAnimationFrame(() => {
      if (single && stage.current) stage.current.focus();
      else if (returnKeyboardFocus.current && lastSelected.current && tiles.current[lastSelected.current - 1]) {
        tiles.current[lastSelected.current - 1].focus();
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [single]);

  useEffect(() => {
    if (!single) return;
    let touchStart = null;
    const move = delta => goToPage(pageRef.current + delta);
    const handleKey = event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target.closest && event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End', 'Escape'].includes(event.key)) {
        event.preventDefault();
        if (event.key === 'Home') goToPage(1);
        else if (event.key === 'End') goToPage(count);
        else if (event.key === 'Escape') { returnKeyboardFocus.current = true; backToGrid(); }
        else move(['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1);
      }
    };
    const startTouch = event => {
      suppressClickUntil.current = 0;
      interruptNavigation();
      if (event.target.closest && event.target.closest('details')) return;
      const touch = event.touches[0];
      touchStart = event.touches.length === 1
        ? { id: touch.identifier, x: touch.clientX, y: touch.clientY } : null;
    };
    const cancelTouch = () => { touchStart = null; };
    const moveTouch = event => { if (event.touches.length !== 1) cancelTouch(); };
    const endTouch = event => {
      if (touchStart === null) return;
      const touch = Array.from(event.changedTouches).find(item => item.identifier === touchStart.id);
      if (!touch) return;
      const dx = touchStart.x - touch.clientX;
      const dy = touchStart.y - touch.clientY;
      touchStart = null;
      // Vertical swipes use native scrolling; only horizontal swipes need handling.
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
      suppressClickUntil.current = Date.now() + 500;
      move(dx > 0 ? 1 : -1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    const target = stage.current;
    target.addEventListener('touchstart', startTouch, { passive: true });
    target.addEventListener('touchmove', moveTouch, { passive: true });
    target.addEventListener('touchend', endTouch, { passive: true });
    target.addEventListener('touchcancel', cancelTouch, { passive: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      target.removeEventListener('touchstart', startTouch);
      target.removeEventListener('touchmove', moveTouch);
      target.removeEventListener('touchend', endTouch);
      target.removeEventListener('touchcancel', cancelTouch);
    };
  }, [single, count, goToPage, backToGrid, interruptNavigation]);

  if (!single) return (
    <PhotoShell>
      <BackLink to="/photos">← All collections</BackLink>
      <CollectionHeader>
        <Eyebrow>{String(count).padStart(2, '0')} photographs</Eyebrow>
        <PageHeading>{collection.title}</PageHeading>
        <Description>{collection.subtitle}</Description>
      </CollectionHeader>
      <Masonry>
        {collection.content.map((name, index) => (
          <Tile key={name} to={photoUrl(index + 1)} ref={element => { tiles.current[index] = element; }}
            aria-label={`View ${collection.title}, photograph ${index + 1}`}
            onClick={event => openFromGrid(event, index)}>
            <ImageFrame><img src={getFullUrlForHeaderImage(name, collection.imageFolder)}
              srcSet={getPhotoSrcSet(name, collection.imageFolder)} sizes={photoGridSizes}
              onLoad={event => {
                const image = event.currentTarget;
                if (image.naturalWidth) previews.current.set(index + 1, image.currentSrc || image.src);
              }}
              alt="" loading={index < 3 ? 'eager' : 'lazy'} /></ImageFrame>
            <span>{String(index + 1).padStart(2, '0')}</span>
          </Tile>
        ))}
      </Masonry>
    </PhotoShell>
  );

  return (
    <Viewer>
      <ViewerChrome />
      <ViewerHeader>
        <BackLink to={pathname} replace>← Back to {collection.title}</BackLink>
        <span>{collection.title}</span>
      </ViewerHeader>
      <Stage ref={stage} tabIndex={-1} aria-label={`${collection.title} single photograph view`}
        onScroll={handleScroll} onWheel={interruptNavigation}
        onClickCapture={event => {
          if (Date.now() < suppressClickUntil.current) {
            event.preventDefault(); event.stopPropagation();
          }
        }}>
        <PhotoOverlay>
        {collection.content.map((name, index) => {
          const url = getFullUrlForImage(name, collection.imageFolder);
          const displayUrl = getFullUrlForViewerImage(name, collection.imageFolder, viewerWidth);
          const shouldLoad = index + 1 === page || requestedPhotos.has(index + 1);
          const preview = previews.current.get(index + 1);
          const ready = loadedPhotos.has(index + 1);
          const failed = failedPhotos.has(index + 1);
          return <Slide key={name} ref={element => { layers.current[index] = element; }} aria-label={`Photograph ${index + 1}`}>
            <a tabIndex={page === index + 1 ? 0 : -1} href={url} target="_blank" rel="noopener noreferrer"
              aria-label={`Open ${collection.title}, photograph ${index + 1}, at full size`}>
              {preview && !ready && <img src={preview} alt="" aria-hidden="true" draggable={false} />}
              {!ready && <LoadingMessage data-preview={Boolean(preview)} role={page === index + 1 ? 'status' : undefined}>
                {failed ? 'Larger photo unavailable · click to open original' : preview ? 'Loading larger photo…' : 'Loading photo…'}
              </LoadingMessage>}
              <img src={shouldLoad ? displayUrl : undefined} alt={`${collection.title}, photograph ${index + 1}`} draggable={false}
                style={{ opacity: ready ? 1 : 0 }} decoding="async"
                onError={() => setFailedPhotos(previous => new Set(previous).add(index + 1))}
                onLoad={() => setLoadedPhotos(previous => {
                  if (previous.has(index + 1)) return previous;
                  const next = new Set(previous); next.add(index + 1); return next;
                })} />
            </a>
          </Slide>;
        })}
        </PhotoOverlay>
        {collection.content.map(name => <ScrollStep key={name} aria-hidden="true" />)}
      </Stage>
      <PhotoMetadata collection={collection} page={page} />
      <Controls>
        <div>
          <button aria-label="Previous photograph" disabled={page === 1} onClick={() => goToPage(page - 1)}>←</button>
          <span aria-live="polite">{String(page).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
          <button aria-label="Next photograph" disabled={page === count} onClick={() => goToPage(page + 1)}>→</button>
        </div>
        <small>Swipe left / right or up / down</small>
      </Controls>
    </Viewer>
  );
}

export default function PhotosPage() {
  const { collectionUrl } = useParams();
  const collection = PhotoCollections[collectionUrl];
  return collection ? <Collection key={collectionUrl} collection={collection} /> : <NotFound />;
}
