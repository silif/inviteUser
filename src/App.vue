<template>
  <div id="app">
    <Head></Head>
    <div class="main">
      <div class="content">
        <h1>A bertter way to enjoy everyday</h1>
        <p>be the first kown when we launch</p>
        <Button type="primary" plain @click="makeInvite">Requst an invite</Button>
      </div>
    </div>
    <Dialog :visible="visible" title="Request an invite" @close="closeDialog">
      <VForm ref="form" :model="formData" :rules="rules">
        <VFormItem label="name:" prop="name">
          <Input prefixIcon="icon-user" v-model="formData.name"/>
        </VFormItem>
        <VFormItem label="email:" prop="email">
          <Input prefixIcon="icon-emailFilled" v-model="formData.email"/>
        </VFormItem>
        <VFormItem label="email comfirm:" prop="emailConfirm">
          <Input prefixIcon="icon-emailFilled" v-model="formData.emailConfirm"/>
        </VFormItem>
        <div>{{postResult}}</div>
        <Button @click="submitForm" type="primary" :loading="loading" full>Send</Button>
        <div>{{massage}}</div>
      </VForm>
    </Dialog>
    <Dialog :visible="doneVisible" @close="closeDone">
      <h1>All Done</h1>
      <p class="tips">you will be one of the first to experience Broccoil & Co. when we lounch</p>
      <Button @click="closeDone" type="primary" full>OK</Button>
    </Dialog>
    <Foot></Foot>
  </div>
</template>

<script>
import VForm from './components/form/Form'
import VFormItem from './components/form/FormItem'
import Input from './components/Input'
import Button from './components/Button'
import Dialog from './components/Dialog'
import Foot from './components/Foot'
import Head from './components/Head'
import axios from 'axios'
export default {
  name: 'app',
  components: {
    Input,
    Button,
    VForm,
    VFormItem,
    Dialog,
    Foot,
    Head
  },
  data () {
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('cant be empty'))
      } else if (value !== this.formData.email) {
        callback(new Error('not same!'))
      } else {
        callback()
      }
    }
    return {
      doneVisible: false,
      loading: false,
      postResult: '',
      visible: false,
      massage: '',
      formData: {
        name: '',
        email: '',
        emailConfirm: ''
      },
      rules: {
        name: [
          { required: true, message: 'cant be empty', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'cant be empty', trigger: 'blur' },
          { type: 'email', message: 'bot ture email format', trigger: 'blur' }
        ],
        emailConfirm: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (evt) {
      evt.preventDefault()
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.postUserInfo()
        } else {
          return null
        }
      })
    },
    postUserInfo () {
      const { name, email } = this.formData
      this.loading = true
      axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
        name,
        email
      }).then((response) => {
        this.loading = false
        this.doneVisible = true
        this.visible = false
        this.handleReset()
      }).catch((err) => {
        console.log(err)
        this.postResult = err.data
        this.loading = false
      })
    },
    handleReset () {
      this.$refs.form.resetFields()
      this.message = ''
    },
    closeDialog () {
      this.visible = false
      this.handleReset()
    },
    makeInvite () {
      this.visible = true
    },
    closeDone () {
      this.doneVisible = false
    }
  }
}
</script>

<style lang="scss">
.main{
  min-height: calc(100vh - 70px);
  max-width: 1000px;
  margin: 30px auto auto auto;
  .content{
    text-align: center;
    max-width: 400px;
    margin: auto;
    padding-top: 35vh;
  }
  .tips{
    width: 21em;
    text-align: center;
    margin: 2em auto;
  }
}
</style>
