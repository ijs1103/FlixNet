import styled from "styled-components";

export const DetailComponents = {

 Container: styled.div`
height: calc(100vh - 50px);
width: 100%;
position: relative;
padding: 50px;
font-size: 1rem;
`,

 Backdrop: styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-image: url(${props => props.bgImage});
background-position: center center;
background-size: cover;
filter: blur(3px);
opacity: 0.5;
z-index: 0;
`,

 Contents: styled.div`
display: flex;
width: 100%;
position: relative;
z-index: 1;
height: 100%;
`,

 Cover: styled.div`
width: 30%;
background-image: url(${props => props.bgImage});
background-position: center center;
background-size: cover;
height: 100%;
border-radius: 5px;
`,

 Data: styled.div`
width: 70%;
margin-left: 1rem;
overflow-y: scroll;
`,

 Title: styled.p`
font-size: 2.5rem;
`,
 TabButton: styled.div`
width: 25%;
color: ${props => (props.current ? "white" : "darkgrey")};
font-size: 1.5rem;
text-align: center;
text-transform: capitalize;
padding: 1rem;
border-bottom: ${props => (props.current ? "yellow" : "transparent")} solid 2px;
transition: border-bottom 0.5s ease-in-out;
pointer-events: ${props => props.blocked ? "none" : "auto"};
`,

 TabMenu: styled.div`
display: flex;
margin: 0.5rem 0px;
`,

 ItemContainer: styled.div`
margin: 1rem 0;
height: 70%;
`,

 Item: styled.span`
  font-size: 1.5rem;
 `,

 Divider: styled.span`
margin: 0 20px;
`,

 Overview: styled.p`
font-size: 1.5rem;
margin-top: 20px;
opacity: 0.7;
line-height: 1.5;
`,

 Image: styled.div`
background-image: url(${props => props.bgUrl});
width: 125px;
height: 180px;
background-size: cover;
border-radius: 4px;
background-position: center center;
`,

 ImageContainer: styled.div`
margin-bottom: 5px;
position: relative;
`,

 Stitle: styled.div`
font-size: 0.8rem;
color: rgba(255, 255, 255, 0.5);
`,

 Casts: styled.div`
height: 55%;
margin: 1rem auto;
display: flex;
overflow-x: scroll;
overflow-y: hidden;
::-webkit-scrollbar {
height: 4px;
}
::-webkit-scrollbar-track {
background-color: transparent;
}
::-webkit-scrollbar-thumb {
border-radius: 5px;
background-color: yellow;
}
`,

 Cast: styled.div`
margin-right: 1.5rem;
`,

 Cnames: styled.p`
font-size: 1.5rem;
margin-top: 2rem;
opacity: 0.7;
`,

Videos: styled.div`
height: 100%;
`,
 Video: styled.iframe`
`,
Scontainer: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    grid-gap: 25px;
`,
Year: styled.span`
  font-size: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
`

};