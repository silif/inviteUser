import Vue from 'vue'
import Button from '@/components/Button.vue'

function getVm (Component, propsData) {
  const Constructor = Vue.extend(Component)
  const vm = new Constructor({ propsData: propsData }).$mount()
  return vm
}
describe('Button.vue', () => {
  let vm;
  it('loading', () => {
    vm = getVm(Button, {
        loading: true
    })
    let buttons = vm.$el;
    expect(buttons.classList.contains('is-loading')).toBe.true;
  });
  it('plain', () => {
    vm = getVm(Button, {
        plain: true
    })
    let buttons = vm.$el;
    expect(buttons.classList.contains('is-plain')).toBe.true;
  });
  console.log('其他测试类似')
})
