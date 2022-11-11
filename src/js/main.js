// 引入 three.js
import * as THREE from 'three';

// 引入 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 引入 bat.gui --- 一个轻量级 ui 库
import * as dat from 'dat.gui';

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

// 导入纹理加载器
const textureLoader = new THREE.TextureLoader()

// 导入纹理 -- gitee图片
const giteeColorTexture = textureLoader.load('./texture/gitee.png')

// 设置偏移量属性
// giteeColorTexture.offset.z = 1

// 设置旋转 45deg
// giteeColorTexture.rotation = Math.PI / 4.

// 设置旋转的圆点
// giteeColorTexture.center.set(0.5, 0.5)

// 设置纹理的重复
giteeColorTexture.repeat.set(2, 3)
// 设置纹理重复的模式

// x 轴 - 镜像
giteeColorTexture.wrapS = THREE.MirroredRepeatWrapping
// y 轴 - 无限重复
giteeColorTexture.wrapT = THREE.RepeatWrapping




const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

const cubeMaterial = new THREE.MeshBasicMaterial({
  color: '#fff',
  map: giteeColorTexture
})

const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

scene.add(mesh)


// 创建 GUI
const gui = new dat.GUI();

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



// 监听双击事件
window.addEventListener('dblclick', () => {
  // 获取文档中处于全屏状态的 dom
  const fullScreenElement = document.fullscreenElement
  if (!fullScreenElement) {
    // 让画布进入全屏
    renderer.domElement.requestFullscreen()
  } else {
    // 退出全屏 
    document.exitFullscreen()
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


