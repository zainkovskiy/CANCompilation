import React from "react";
import { Link } from 'react-scroll';
import { Link as LinkMUI } from '@mui/material';

import './Subtitle.scss';

export function Subtitle({ subtitle, link, path, name }) {
  return (
    <div className="subtitle" name={name}>
      <span className="subtitle__text">{subtitle}</span>
      <LinkMUI
        underline="none"
        sx={{ fontSize: 12, fontFamily: 'Montserrat', cursor: 'pointer' }}
      >
        <Link
          to={path}
          smooth={true}
          duration={500}
        >
          {link}
        </Link>
      </LinkMUI>
    </div>
  )
}