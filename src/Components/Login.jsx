// import React, { useState } from 'react';
// import { Form, Input, Button,  message } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const onFinish = async (values) => {
//         setLoading(true);
//         try {
         
//             const response = await axios.post('http://102.133.144.226:8000/api/v1/users/login', {
//                 email: values.username, 
//                 password: values.password,
//             });


//             if (response.status === 200 && response.data.success) {
              
//                 localStorage.setItem('authToken', response.data.data.token);

                
//                 localStorage.setItem('user', JSON.stringify(response.data.data.user));

//                 message.success('Login successful!');
//                 navigate('/admin'); 
//             } else {
//                 message.error('Invalid email or password');
//             }
//         } catch (error) {
//             message.error('Invalid email or password');
//         }
//         setLoading(false);
//     };

//     return (
//         <div style={{ maxWidth: '300px', margin: '100px auto', padding: '30px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
//             <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Login</h2>
//             <Form
//                 name="login_form"
//                 initialValues={{ remember: true }}
//                 onFinish={onFinish}
//             >
//                 <Form.Item
//                     name="username"
//                     rules={[{ required: true, message: 'Please enter your email!' }]}
//                 >
//                     <Input placeholder="Email" />
//                 </Form.Item>

//                 <Form.Item
//                     name="password"
//                     rules={[{ required: true, message: 'Please enter your password!' }]}
//                 >
//                     <Input.Password placeholder="Password" />
//                 </Form.Item>

//                 {/* <Form.Item>
//                     <Form.Item name="remember" valuePropName="checked" noStyle>
//                         <Checkbox>Remember me</Checkbox>
//                     </Form.Item>
//                 </Form.Item> */}

//                 <Form.Item>
//                     <Button type="primary" htmlType="submit" loading={loading} block>
//                         Login
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </div>
//     );
// };

// export default Login;



import React, { useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
    const [verifyOtpVisible, setVerifyOtpVisible] = useState(false);
    const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://102.133.144.226:8000/api/v1/users/login', {
                email: values.username, 
                password: values.password,
            });

            if (response.status === 200 && response.data.success) {
                localStorage.setItem('authToken', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                message.success('Login successful!');
                navigate('/admin'); 
            } else {
                message.error('Invalid email or password');
            }
        } catch (error) {
            message.error('Invalid email or password');
        }
        setLoading(false);
    };

    const handleForgotPassword = async () => {
        try {
            await axios.post('http://102.133.144.226:8000/api/v1/users/forgotPassword', { email });
            message.success('OTP sent to your email!');
            setForgotPasswordVisible(false);
            setVerifyOtpVisible(true);
        } catch (error) {
            message.error('Failed to send OTP');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            await axios.post('http://102.133.144.226:8000/api/v1/users/verify-otp', { email, otp });
            message.success('OTP verified!');
            setVerifyOtpVisible(false);
            setResetPasswordVisible(true);
        } catch (error) {
            message.error('Invalid OTP');
        }
    };

    const handleResetPassword = async () => {
        try {
            await axios.post('http://102.133.144.226:8000/api/v1/users/resetPassword', { email, newPassword });
            message.success('Password reset successfully!');
            setResetPasswordVisible(false);
        } catch (error) {
            message.error('Failed to reset password');
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: '100px auto', padding: '30px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Login</h2>
            <Form
                name="login_form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please enter your email!' }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="link" onClick={() => setForgotPasswordVisible(true)}>
                        Forgot Password?
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Login
                    </Button>
                </Form.Item>
            </Form>

          
            <Modal
                title="Forgot Password"
                visible={forgotPasswordVisible}
                onOk={handleForgotPassword}
                onCancel={() => setForgotPasswordVisible(false)}
            >
                <Form>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Verify OTP"
                visible={verifyOtpVisible}
                onOk={handleVerifyOtp}
                onCancel={() => setVerifyOtpVisible(false)}
            >
                <Form>
                    <Form.Item
                        name="otp"
                        rules={[{ required: true, message: 'Please enter the OTP!' }]}
                    >
                        <Input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Reset Password"
                visible={resetPasswordVisible}
                onOk={handleResetPassword}
                onCancel={() => setResetPasswordVisible(false)}
            >
                <Form>
                    <Form.Item
                        name="newPassword"
                        rules={[{ required: true, message: 'Please enter a new password!' }]}
                    >
                        <Input.Password placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Login;
