import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterContainer className='main-footer'>
      <div className='footer-middle'>
        <div className='container'>
          <div className='row'>
            {/* Column 1 */}
            <div className='col-md-4 col-sm-8'>
              <h4>E-SHOP</h4>
              <ul className='list-unstyled'>
                <li>Mikiny</li>
                <li>Trika</li>
                <li>Kalhoty</li>
                <li>Boty</li>
              </ul>
            </div>
            {/* Column 2 */}
            <div className='col-md-4 col-sm-8'>
              <h4>JAK NAKUPOVAT</h4>
              <ul className='list-unstyled'>
                <li>Tabulka velikostí</li>
                <li>doprava</li>
                <li>platba</li>
                <li>vrácení zboží</li>
              </ul>
            </div>
            {/* Column 3 */}
            <div className='col-md-4 col-sm-8'>
              <h4>O NÁS</h4>
              <ul className='list-unstyled'>
                <li>Kontaktujte nás</li>
                <li>O vývojáři</li>
                <div className='row'>
                  <i className='fab fa-facebook'></i>
                </div>
              </ul>
            </div>
          </div>
          {/* footer bottom */}
          <div className='footer-bottom'>
            <p className='text-xs-center'>
              &copy;{new Date().getFullYear()} Václav Štrba
            </p>
          </div>
        </div>
      </div>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.footer`
  .footer-middle {
    background: var(--mainDark);
    padding-top: 3rem;
    color: var(--mainWhite);
  }

  .footer-bottom {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
`
