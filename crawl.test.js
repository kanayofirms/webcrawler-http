const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.pembo.org/path'
    const actual = normalizeURL(input)
    const expected = 'blog.pembo.org/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.pembo.org/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.pembo.org/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.pembo.org/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.pembo.org/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.pembo.org/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.pembo.org/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.pembo.org/">
            Pembo.org Blog
        </a>
    </body>
</html>   
`
    const inputBaseURL = "https://blog.pembo.org"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.pembo.org/"]
    expect(actual).toEqual(expected)
})

