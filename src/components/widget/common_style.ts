const styles = {
    page: {
        maxWidth: '700px',
        margin: 'atuo',
        textAlign: 'center' as const
    },
    content: {
        width: '100%',
        marginTop: '20px',
        textAlign: 'left' as const
    },
    main_color: {
        color: '#3CC68A'
    },
    wide_card: {
        padding: '10px',
        textAlign: 'left' as const
    },
    wide_card_title: {
        color: '#3CC68A',
        textAlign: 'center' as const
    },
    blockquote: {
        background: '#f9f9f9',
        borderLeft: '10px solid #3CC68A',
        margin: '1.5em 10px',
        padding: '1em 2em',
        color: 'black',
    },
    clear_path: {
        clear: 'both' as const
    },
    li: {
        listStyleType: 'none',
        marginLeft: '0'
    },
    ul: {
        listStyleType: 'none',
        paddingLeft: '0'
    }
}

export default styles;