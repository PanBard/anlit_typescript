import { APP_CONFIG } from "lib/config"
import { useCommons } from '../hooks/useCommons'
import styled from "styled-components"


export const Footer = () => {
    const T = useCommons()
    const year = new Date().getFullYear() //pobiera aktualny rok

    return(
        <FooterContainer>
            <CodemaskContainer>
                &copy; {year} {T.common.companyName}
            </CodemaskContainer>
            <LinkContainer>
                <Link href={APP_CONFIG.FLAT_ICON_URL} target='_blank'>
                    {T.components.footer.flaticons}
                </Link>
                <Link  href={APP_CONFIG.LIBRE_TRANSLATE_URL}  target='_blank'>
                    {T.components.footer.libretranslate}
                </Link>
            </LinkContainer>
        </FooterContainer>
    )

}



const FooterContainer = styled.div`
    height: 60px;
    background-color: ${({theme}) => theme.colors.foreground };
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const CodemaskContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${({theme})=> theme.colors.typography};
`

const LinkContainer = styled.div`
    
`

const Link = styled.a`
      color: ${({theme})=> theme.colors.typography};
      text-decoration: underline;
      cursor: pointer; 
      padding: 0 10px
`