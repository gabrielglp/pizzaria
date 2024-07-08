import { canSSRAuth } from "../../utils/canSSRAuth"

export default function DashBoard() {
    return (
        <div>
            <h1>Bem vindo</h1>
        </div>
    )
}

export const getServerSideProps = canSSRAuth( async (ctx) => {
  
    return {
      props: {}
    }
  })