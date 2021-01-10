import { Form, Input, Button, Checkbox } from 'antd';
import { Spin, Alert } from 'antd';
import {useState}from'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

const MySwal = withReactContent(Swal)

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const FormComponent = () => {
  const [loading,setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    var response = await axios({
      method:'post',
      url:'http://localhost:3000/api/alo',
      data:{
        pages:values.pages,
        type:values.type,
        place:values.place
      }
    })
    if(response.status == '200'){
      MySwal.fire(
        'Guardado Correctamente',
        'Se guardaron correctamente',
        'success'
      )

      setLoading(false)
    }
   
      
     
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if(loading){
    return(
      <Spin tip="Loading..."> 
     
      </Spin>
    )
  }
  return (
    <Form
      {...layout}
      name="basic"
     
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Tipo"
        name="type"
        rules={[
          {
            required: true,
            message: 'Ingresa el tipo'
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Lugar"
        name="place"
        rules={[
          {
            required: true,
            message: 'Ingresa el lugar',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Paginas"
        name="pages"
        rules={[
          {
            required: true,
            message: 'Ingresa el numero de paginas',
          },
        ]}
      >
        <Input />
      </Form.Item>

      

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent