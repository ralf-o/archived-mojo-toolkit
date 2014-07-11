/*global mojoToolkitMeta: true */

mojoToolkitMeta = {
    packages: [
        {
            name: 'mojo.base',
            jsFiles: [
                'Exception.js',
                'IllegalArgumentException.js',
                'StopIterationException.js'
            ]
        },
        {
            name: 'mojo.util',
            jsFiles: [
                'DomUtils.js',
                'HtmlBuilder.js',
                'ObjectUtils.js',
                'Seq.js',
                'StringUtils.js'
            ]
        },
        {
            name: 'mojo.react',
            jsFiles: [
                'EventStream.js',
                'Behavior.js'
            ]
        }
    ]
};
