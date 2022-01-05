import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { loginUser } from "../../Context/actions/Auth.actions";
import AuthGlobal from "../../Context/store/AuthGlobal";
import Error from "../../Shared/Error";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";

// context

const Login = (props) => {
    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("UserProfile");
        }
    }, [context.stateUser.isAuthenticated]);

    const handleSubmit = () => {
        const user = {
            email,
            password,
        };

        if (email === "" || password === "") {
            setError("Please fill in your credentials");
        } else {
            loginUser(user, context.dispatch);
            console.log('success')
        }
    };

    return (
        <FormContainer title={"Login"}>
            <Input
                placeholder={"Enter Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Input
                placeholder={"Enter Password"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonGroup}>
                <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                    {error ? <Error message={error} /> : null}
                    <Button title="Login" onPress={handleSubmit} />
                </View>
                <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                    <Button title="Don't have an account yet ?" onPress={()=>props.navigation.navigate('Register')}/>
                </View>
            </View>
        </FormContainer>
    );
};

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        alignItems: "center",
    },
    middleText: {
        marginBottom: 20,
        alignSelf: "center",
    },
});

export default Login;