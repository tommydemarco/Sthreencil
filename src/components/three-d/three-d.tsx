import { Component, Host, h } from "@stencil/core"

@Component({
    tag: "three-d",
    styleUrl: "three-d.scss",
    shadow: false
})
export class ThreeD {
    render() {
        return (
            <Host>
                <h1>Hello from the component</h1>
            </Host>
        )
    }
}