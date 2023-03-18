import { BrowserRouter as  Link, NavLink } from 'react-router-dom';
import { APP_CONFIG } from "lib/config"
import { useCommons } from "lib/hooks/useCommons" 
import styled from "styled-components"




export const Header = () => {
    const T = useCommons()


    return(
        <HeaderContainer>
            <LogoContainer>
                {/* <Logo src={Images.Logo}/> */}
                <NavLink to='/'>
                <Title>
                    {T.components.header.title}
                </Title></NavLink>
            </LogoContainer>

            <div>
            {/* <Link to='/'>Home</Link> */}
            <NavLink to='start'> <Title>START</Title></NavLink>
            <NavLink to='testowy'> <Title>TESTOWY</Title></NavLink>
            </div>


            <LinkContainer>
                 <Linkos href={APP_CONFIG.GITHUB_URL} target='_blank'>  {/* target='_blank' eby otwierao sié w nowym oknie */}
                    {T.components.header.github}
                </Linkos>
                <Linkos href={APP_CONFIG.DISCORD_URL} target='_blank'>
                    {T.components.header.diskord}
                </Linkos>
            </LinkContainer>


        </HeaderContainer>
    )
}


const HeaderContainer = styled.div`
    height: 60px;
    background-color: ${({theme}) => theme.colors.foreground };
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Logo = styled.img`
    height: 36px;
    width: 36px;
    margin-right: 18px;
`

const Title = styled.h1`
    display: inline;
    font-size: 20px;
    color: ${({theme})=> theme.colors.typography};
`

const LinkContainer = styled.div`
    
`

const Linkos = styled.a`
      color: ${({theme})=> theme.colors.typography};
      text-decoration: underline;
      cursor: pointer; 
      padding: 0 10px
`