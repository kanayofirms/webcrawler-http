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

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.pembo.org/path/">
            Pembo.org Blog
        </a>
    </body>
</html>   
`
    const inputBaseURL = "https://blog.pembo.org/path/"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.pembo.org/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            Pembo.org Blog
        </a>
    </body>
</html>   
`
    const inputBaseURL = "https://blog.pembo.org"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.pembo.org/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.pembo.org/path1/">
            Pembo.org Blog Path One
        </a>
        <a href="/path2/">
            Pembo.org Blog Path Two
        </a>
    </body>
</html>   
`
    const inputBaseURL = "https://blog.pembo.org"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.pembo.org/path1/", "https://blog.pembo.org/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">
            Invalid URL
        </a>
    </body>
</html>   
`
    const inputBaseURL = "https://blog.pembo.org"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})


