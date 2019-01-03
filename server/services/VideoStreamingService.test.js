const { getStartEndBytes } = require('./VideoStreamingService');

describe('VideoStreamingService', () => {
    it('should get star, end position from head range', () => {
        const range = 'bytes/'
        expect(getStartEndBytes(range)).toEqual([])
    })
});