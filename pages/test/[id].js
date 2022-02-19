import { useRouter } from "next/router";
import MainLayout from "../../layouts/main-layout"

const Test = ()=>{
    const router = useRouter();
    const {id} = router.query;

    return <MainLayout>
        <div className="h-100 d-flex justify-content-center align-items-center">
            <h1>
                ID: {id}
            </h1>
        </div>
    </MainLayout>
}

export default Test;