// 引入 three.js
import * as THREE from 'three';

// 引入 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 引入 gsap 动画库 
import gsap from 'gsap';

// 创建场景
const scene = new THREE.Scene()

// 创建相机 - 透视相机
// 角度, 宽高比, 近端, 远端
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
// x, y, z
camera.position.set(0, 0, 10)

// 将相机添加到场景中
scene.add(camera)

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })

// 创建物体
// 根据 几何体 和 材质 创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

// 修改物体位置
// cube.position.set(5, 4, 0)
// cube.position.x = 0

// 缩放
// cube.scale.set(2, 2, 2)
// cube.scale.x = 2

// 旋转
// Math.PI = 180°
// cube.rotation.set(Math.PI / 4, 0, 0, 'XYZ')
// cube.rotation.x = Math.PI / 4


// 将几何体添加到场景之中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()

// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 渲染器实质上是往 画布(canvas) 上进行绘制

// 将 webgl 渲染的 canvas 内容添加到 body 上
// renderer.domElement => 一个 canvas DOM
document.body.appendChild(renderer.domElement)

// 使用渲染器, 通过相机将场景渲染进来
// renderer.render(scene, camera)

// 创建轨道控制器
// 传入 相机 和 用于事件监听的 HTML 元素 (canvas)
const controls = new OrbitControls(camera, renderer.domElement)

// 设置控制器阻尼, 提高控制器的真实性, ##必须要在动画循环中调用.update()
controls.enableDamping = true

// 创建坐标辅助器
// 红x 绿y 蓝z
const axesHelper = new THREE.AxesHelper(5)

// 添加 坐标辅助器 到场景中
scene.add(axesHelper)

// window.requestAnimationFrame()
// 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
// 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

// 设置 three 自带的时钟
const clock = new THREE.Clock()

// 设置动画
const animate1 = gsap.to(cube.position, {
  // 移动到的坐标
  x: 5,
  // 持续时间
  duration: 2,
  // 贝塞尔曲线
  ease: 'power1.inOut',
  // 动画开始时的回调函数
  onStart: () => {
    console.log('The animation start')
  },
  // 动画结束时的回调函数
  onComplete: () => {
    console.log('The animation is complete')
  },
  // 设置重复的次数,1 --> 重复一次, 2 --> 重复两次, -1 ---> 循环
  repeat: -1,
  // 开启往返运动, 需要配合 repea 使用
  yoyo: true,
  // 延时时间
  delay: 1
})
gsap.to(cube.rotation, { x: Math.PI * 2, duration: 5, ease: 'power1.inOut' })

// 监听双击事件
window.addEventListener('dblclick', () => {
  // isActive() 是否在活动中---返回布尔值
  if (animate1.isActive()) {
    // 暂停
    animate1.pause()
  } else {
    // 恢复
    animate1.resume()
    // 播放
    // animate1.play()
  }

})



// 渲染函数
function render () {
  controls.update()
  renderer.render(scene, camera)
  // 浏览器每渲染一帧都会调用 render 函数
  requestAnimationFrame(render)
}

render()


// 监听窗口尺寸变化
window.addEventListener('resize', () => {
  // console.log('窗口变化了')
  // 更新摄像机宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // Camera 在大多数属性发生改变之后，你将需要调用.updateProjectionMatrix来使得这些改变生效。
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 更新渲染器像素比 
  // .setPixelRatio 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
  // window.devicePixelRatio 获取设备像素比
  renderer.setPixelRatio(window.devicePixelRatio)
}) 
