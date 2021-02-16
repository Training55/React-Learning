import {fetchJson} from "../helperBackend";

export {}

test("Get response of http call", async () => {

    let httpCall = jest.fn();
    httpCall.mockReturnValue(Promise.resolve({
        json: () => Promise.resolve({image: "example"}),
        ok: true
    }));

    global.fetch = httpCall;

    let object = await fetchJson("url");
    expect(object.image).toBe("example");
    expect(httpCall.mock.calls.length).toBe(1);
});

test("Expect error to be thrown!", async () => {
    let httpCall = jest.fn();
    httpCall.mockReturnValue(Promise.resolve({
        json: () => Promise.resolve({image: "example"}),
        ok: false
    }));

    global.fetch = httpCall;

    await expect(() => fetchJson("url")).rejects.toEqual(new Error("Response was not ok!"))
})