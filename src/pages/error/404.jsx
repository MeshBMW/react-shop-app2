import {Header} from "../../components/Header.tsx";

export function NF404() {
  return (
      <>
        <link rel="apple-touch-icon" sizes="180x180" href="/faviconE/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/faviconE/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/faviconE/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <Header />
        <div style={{
          backgroundColor: "red",
          fontSize: "38px",
          color: "white",
          textAlign: "center",
          marginTop: "60px",
          padding: "10px",
          textDecoration: "underline",
          textDecorationColor: "white",
          textDecorationThickness: "2px",
        }}>
          404 Error. Not Found!
        </div>
        <a href='/'>Back to Home Page</a>
      </>
  )
}