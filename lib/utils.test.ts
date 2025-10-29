import { getRelativeTime } from "./utils";

describe("getRelativeTime", () => {
    it("returns seconds ago for recent dates", () => {
        const now = new Date();
        const fiveSecondsAgo = new Date(now.getTime() - 5000);
        const result = getRelativeTime(fiveSecondsAgo);

        expect(result).toBe("5s ago");
    });

    it("returns minutes ago for slightly older timestamps", () => {
        const now = new Date();
        const tenMinutesAgo = new Date(
            now.getTime() - 10 * 60 * 1000
        );
        const result = getRelativeTime(tenMinutesAgo);

        expect(result).toBe("10m ago");
    });

    it("returns hours ago for older timestamps", () => {
        const now = new Date();
        const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
        const result = getRelativeTime(threeHoursAgo);

        expect(result).toBe("3h ago");
    });

    it("returns days ago for much older timestamps", () => {
        const now = new Date();
        const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
        const result = getRelativeTime(twoDaysAgo);

        expect(result).toBe("2d ago");
    });
});
