"use strict";
const getConfig = require('../lib/anyproxy.config')
const mock = require("../lib/mock");
const getParas = require('./getParas')

describe("anyproxy.config", () => {
    it("beforeSendRequest normalMatched", () => {
        const config = getConfig();
        var result = config.beforeSendRequest({
            url: getParas('normal').splice(0, 1),
            requestData: {}
        }).next();
        const rt = mock(...getParas('normal').splice(1))
        expect(result.value).toEqual({
            response: rt.response
        });
    });
    it("beforeSendRequest protectedNotMatched", () => {
        const config = getConfig();
        var result = config.beforeSendRequest({
            url: getParas('protected').splice(0, 1),
            requestData: {}
        }).next();
        expect(result.value).toBeUndefined();
    });
});