import React, {useState} from 'react'
import AddQuestionContext from "./AddQuestionContext.js";
import ApplicationContext from "./ApplicationContext.js";
const AddContextProvider = ({children})=>{

    const [addingQuestions, setAddQuestions] = React.useState(false);
    const [type, setType] = React.useState('');
    const[optionQuestion, setOptionQuestion] = React.useState([]);
    const [id, setId] = React.useState(null);
    const [value1, setValue1] = useState({
        personalQuestions: [],

    })
    const [value2, setValue2] = useState({
        educationalQuestion: [],

    })
    const [value3, setValue3] = useState({
        testExams: [],
    })
    const [value4, setValue4] = useState({
        deadlines: [],
    })
    const [value5, setValue5] = useState({
        fees: "",
    })
    const [value6, setValue6] = useState({
        links: [],
    })
    const [value7, setValue7] = useState({
        contacts: [],
    })
    const [value8, setValue8] = useState({
        address: "",
    })

    const [role, setRole] = React.useState(0);
    const [datas, setDatas] = React.useState({
        acronym: '',
        city:"",
        collegeType:"",
        college_link: "",
        college_logo:"",
        contactNumber:"",
        createdAt:"",
        eduId:"",
        email:"",
        name:"",
        position:"",
        state:"",
        updatedAt:"",
        username:"",
    });

    //application

    return(
        <AddQuestionContext.Provider value={{
            addingQuestions,
            setAddQuestions,
            type,
            setType,
            optionQuestion,
            setOptionQuestion,
            datas,
            role,
            setRole,
            setDatas,
            id,
            setId,
            value1,
            setValue1,
            value2,
            setValue2,
            value3,
            setValue3,
            value4,
            setValue4,
            value5,
            setValue5,
            value6,
            setValue6,
            value7,
            setValue7,
            value8,
            setValue8
        }}>

        {children}

        </AddQuestionContext.Provider>
    )
}

export default AddContextProvider;