import { Component, Host, State, h } from "@stencil/core"
import * as THREE from "three"
@Component({
    tag: "three-d",
    styleUrl: "three-d.scss",
    shadow: false
})
export class ThreeD {

    @State() scene: any;
    @State() mesh: any;
    @State() renderer: any;
    @State() camera: any;

    private sizes = {
        width: 800,
        height: 500
    }
    axesHelper: any;

    componentWillLoad() {
        this.axesHelper = new THREE.AxisHelper(4)
        this.scene = new THREE.Scene()
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: "#fff" })
        this.mesh = new THREE.Mesh(geometry, material)
        this.scene.add(this.mesh)
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height)
        this.camera.position.z = 6
        this.scene.add(this.camera)
        this.scene.add(this.axesHelper)
    }

    componentDidLoad() {
        const canvas = document.querySelector("canvas")
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas })
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.render(this.scene, this.camera)
    }

    private changeCubePosition = () => {
        this.mesh.position.set(1, 0.7, -2)
        this.mesh.scale.set(2, 0.3, 2)
        this.mesh.rotation.y = 1.4
        this.camera.position.set(1, 2, 1)
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <Host>
                <h1 onClick={this.changeCubePosition}>Hello from the component</h1>
                <canvas class="canvas"></canvas>
            </Host>
        )
    }
}