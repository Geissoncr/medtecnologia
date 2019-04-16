import React, {Component}from 'react';
import { View, TextImput, Button } from 'react-native';

class Form extends Component {
    
}

export default Form;


// import { withFormik } from 'formik';


// const Form = (props) => (
//     <View>
//         <TextImput
//             value={props.values.nome}
//             onChangeText={text => props.setFieldValue('nome', text)}
//         />


//         <TextImput
//             value={props.values.email}
//             onChangeText={text => props.setFieldValue('email', text)}
//         />


//         <Button
//               onPress={props.handleSubmit}
//               title="Enviar"
//         />


//     </View>
// );

// export default withFormik({
//     mapPropsToValues: () => ({ nome: '', email: '' }),

//     handleSubmit: (values) => {
//         console.log('Teste', values);
//     }
// })(Form);