import Register from "../Auth/register"
import Featurecard from "./feature-card/featurecard"
import Footer from "./footer/footer"
import Header from "./header/header"
import Herosection from "./hero-section/herosection"

function AdminPage() {
  return (
    <>
    <Header/>
    <Herosection/>
    <Featurecard/>
    <Footer/>
    </>
  )
}

export default AdminPage
