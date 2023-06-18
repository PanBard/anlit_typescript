import { useCommons } from "lib/hooks/useCommons" 
import styled from "styled-components"
import { BestButton } from './components_modules';

type OneHeaderProps = {
    choosenWeb(params: any): any,
    insideChoice(params: any): any
}

export const OneHeader: React.FunctionComponent<OneHeaderProps> = ({
    choosenWeb,
    insideChoice
}) => {
    const T = useCommons()
    
    return(
        <HeaderContainer>

            <LogoContainer onClick={()=>{insideChoice('Start')}}>
                <Linkos >
                    <Title>
                        {T.components.header.title} 
                    </Title>
                </Linkos>  
                <img src="/logo.svg" alt=""  height={25} width={25}/>              
            </LogoContainer>

            <LinkContainer>                     
                <BestButton style={{background: 'transparent'}} onClick={()=>{choosenWeb({result:'Login'})}}> About project </BestButton>                                                                       
            </LinkContainer>

            <LinkContainer>
                 <Linkos  onClick={()=>{insideChoice('Login')}} >  {/* target='_blank' eby otwierao sié w nowym oknie */}
                    Sign in
                </Linkos>
                <Linkos onClick={()=>{insideChoice('Register')}} >
                    Sign up
                </Linkos>
            </LinkContainer>

        </HeaderContainer>
    )
}


const HeaderContainer = styled.div`
    padding: 0 15px;
    margin: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    z-index: 4;
    width: 100%;
    
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Title = styled.h1`
    display: inline;
    font-size: 20px;
    color: ${({theme})=> theme.colors.typography};
`

const LinkContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Linkos = styled.a`
      color: ${({theme})=> theme.colors.typography};
      text-decoration: underline;
      cursor: pointer; 
      padding: 0 10px;
      text-decoration: none;
      :hover{text-decoration: underline};
      font-size: large;
`


