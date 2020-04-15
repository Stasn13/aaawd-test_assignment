import React, {useState, useMemo} from 'react';
import "./Form.scss"
import {Button, Input, Upload} from "antd";
import {LoadingOutlined} from '@ant-design/icons';

function useValidState(initState, validator ){
    const [state, setState] = useState(initState);
    const valid = useMemo(() => state === '' ? null : !!validator(state), [state]);

    return [state, setState, valid === null || valid ];
}

const Form = props => {

    const [imgInfo, setImgInfo] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const [userName, setUserName, validUserName] = useValidState("",
        (state) => state.match(/[a-zA-Z]{2,15}/));
    const [eMail, setEMail, validEMail] = useValidState("",
        (state) => state.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/));
    const [password, setPassword, validPassword] = useValidState("",
        (state) => state.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/));
    const [repeatPassword, setRepeatPassword, validRepeatPassword] = useValidState("",
        (state) => state.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/));

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file){
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        return isJpgOrPng && isLt2M
    }

    function handleChange(e){
        if (e.file.status === 'uploading') {
            setLoading(true);
        }
        if (e.file.status === 'done') {
            getBase64(e.file.originFileObj, imageUrl => {
                setImgInfo(e.file);
                setImageUrl(imageUrl);
                setLoading(false);
            })
        }
    }
    return (
        <div id="My-info">
            <div className="info-title">My Info</div>
            <section className="info-main">
                <div className="avatar-wrapper">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                            : <span>JS</span>}
                    </Upload>
                    <div className="uploader-desc">
                        <h4 className="avatar-title">
                            Avatar
                        </h4>
                        <div className="warning">
                            jpg or png with size 750x750 pixel, less 2 MB.
                        </div>
                        <Button className="download" type="link">Download New</Button>
                        <div className="file-name">
                            {imgInfo && imgInfo.name}
                        </div>

                    </div>
                </div>
                <div className="form-container">
                    <div className="input-wrapper user-name-wrapper">
                        <span className="input-title">User Name</span>
                        <Input placeholder="your user-name"
                               value={userName}
                               className={validUserName ? "" : "invalid"}
                               onChange={(event) => setUserName(event.target.value)}
                        />
                    </div>
                    <div className="input-wrapper email-wrapper">
                        <span className="input-title">E-mail</span>
                        <Input placeholder="your E-mail"
                               value={eMail}
                               className={validEMail ? "" : "invalid"}
                               onChange={(event) => setEMail(event.target.value)}
                        />
                    </div>

                    <div className="input-group-wrapper">
                        <div className="input-wrapper last-name-wrapper">
                            <span className="input-title">Last Name</span>
                            <Input placeholder="your Last Name" />
                        </div>
                        <div className="input-wrapper first-name-wrapper">
                            <span className="input-title">First Name</span>
                            <Input placeholder="your First Name" />
                        </div>
                    </div>

                    <div className="input-group-wrapper">
                        <div className="input-wrapper last-name-wrapper">
                            <span className="input-title">New Password</span>
                            <Input.Password placeholder="Enter new pass"
                                            value={password}
                                            className={validPassword ? "" : "invalid"}
                                            onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="input-wrapper first-name-wrapper">
                            <span className="input-title">Repeat New Password</span>
                            <Input.Password placeholder="repeat new pass"
                                            value={repeatPassword}
                                            className={validRepeatPassword ? "" : "invalid"}
                                            onChange={(event) => setRepeatPassword(event.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Form;