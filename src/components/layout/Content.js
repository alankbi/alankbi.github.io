import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './Home';
import Blog from './Blog';
import About from './About';
import ProjectPage from './ProjectPage';
import NotFound from './NotFound';
import styled from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import BlogPage from './BlogPage';


const StyledContent = styled.div`
  margin: 160px auto;
  width: 80%;
  justify-content: center;
  
  .fade-enter {
    opacity: 0.01;
  }
  
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 0.2s ease-in;
    transition-delay: 0.2s;
  }
  
  .fade-exit {
    opacity: 1;
  }
    
  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 0.2s ease-in;
  }
  
  div.transition-group {
    position: relative;
  }
  
  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    margin-bottom: 120px;
  }
  
  @media (max-width: 500px) {
    width: 90%;
  }
`;

function Content({ location }) {
  return (
    <StyledContent>
      <TransitionGroup className={"transition-group"}>
        <CSSTransition
          key={location.key}
          timeout={{ enter: 400, exit: 200 }}
          classNames={"fade"} >

          <section className={"route-section"}>
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route exact path="/blog" component={Blog} />
              <Route exact path="/about" component={About} />
              <Route path="/projects/:project" component={ProjectPage} />
              <Route path="/blog/:blog+" component={BlogPage} />
              <Route component={NotFound} />
            </Switch>
          </section>

        </CSSTransition>
      </TransitionGroup>
    </StyledContent>
  );
}

export default withRouter(Content);
