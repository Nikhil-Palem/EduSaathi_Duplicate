import React from "react";
import "./Box.css";
import {useNavigate} from "react-router-dom"; // Import the CSS file

const Box = (props) => {
    const { title, btnClass, btnTitle, price, feature } = props;
    const navigate = useNavigate();

    const free = ()=>{
        navigate('/admin/register')
    }

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">{title}</h4>
            </div>
            <div className="card-body">
                <h1 className="pricing-card-title">
                    ${price} <small className="text-muted">/ mo</small>
                </h1>

                    {feature &&
                        feature.map((data, index) => (
                            <li className="list-unstyled" key={index}>{data}</li>
                        ))}

                <button
                    onClick={()=>{
                        if (title==="Free"){
                            free();
                        }
                    }}
                    type="button"
                    className={`btn btn-lg btn-block ${btnClass}`}
                >
                    {btnTitle}
                </button>
            </div>
        </div>
    );
};

export default Box;
