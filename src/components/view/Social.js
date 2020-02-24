import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { UnstyledLink } from './Link';


function Social(props) {
  const color = props.color ? props.color : undefined;
  return (
    <div>
      <UnstyledLink href={"mailto:alan.bi326@gmail.com"} color={color}>
        <FontAwesomeIcon icon={faEnvelope}/>
      </UnstyledLink>
      <UnstyledLink href={"https://github.com/alankbi"} color={color}>
        <FontAwesomeIcon icon={faGithub}/>
      </UnstyledLink>
      <UnstyledLink href={"https://twitter.com/alankbi"} color={color}>
        <FontAwesomeIcon icon={faTwitter}/>
      </UnstyledLink>
    </div>
  );
}

export default Social;
