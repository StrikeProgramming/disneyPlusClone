import styled from "styled-components";

const Login = (props) => {
  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="/images/cta-logo-one.svg" alt="Disney Logos" />
          <SignUp>GET ALL HERE</SignUp>
          <Description>
            Get Premier Access to Raya and the Last Dragon for an additional fee
            with Disney+ subscription. As of 03/26/31, the price of Disney+ and
            The Disney Bundle will increase by £1.
          </Description>
          <CTALogoTwo src="/images/cta-logo-two.png" alt="Disney Logos" />
        </CTA>
        <BgImage />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  overflow: hidden;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  margin-bottom: 10vw;
  padding: 5rem 2.5rem;
`;

const BgImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 100%;
  background-image: url("/images/login-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  z-index: -1;
`;

const CTA = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 650px;
  width: 100%;
`;

const CTALogoOne = styled.img`
  display: block;
  max-width: 680px;
  width: 100%;
  margin-bottom: 1rem;
`;

const SignUp = styled.a`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #f9f9f9;
  background-color: #0063e5;
  font-size: 1.125rem;
  font-weight: bold;
  letter-spacing: 1.5px;

  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  margin: 0 0 1.5rem;
  color: hsla(0, 0%, 95.3%, 1);
  text-align: center;
  font-size: 0.7rem;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
  display: inline-block;
  vertical-align: bottom;
  max-width: 600px;
  width: 100%;
  margin-bottom: 1.25rem;
`;

export default Login;
