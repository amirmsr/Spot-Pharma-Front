import { useParams } from "react-router-dom";



function EditIntervenant2() {



    const { sessionId } = useParams<{ sessionId: any }>();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }



    return (
        <div>
            <form style={{paddingBottom:'500px',paddingTop:'100px'}} onSubmit={handleSubmit}>
                <h1>Changer image intervenant 2</h1>
                <input type="file" />                                    
            </form>
        </div>
    );
}

export default EditIntervenant2;
