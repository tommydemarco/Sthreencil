import { newE2EPage } from "@stencil/core/testing";

describe("three-d", () => {
    it("should render a component", async () => {
        const page = await newE2EPage();
        await page.setContent(`<ux-checkbox></ux-checkbox>`);
        const el = await page.find("ux-checkbox");
        expect(el).toHaveClass("hydrated");
    });
})