import ImageColors from 'react-native-image-colors'


export  const tryColor = async (link: string) => {

    let color;

    const result = await ImageColors.getColors('https://i.scdn.co/image/ab67616d0000b273711eda7c586a084b6f62a2f4', {
        fallback: '#000000',
        cache: true,
        key: 'unique_key',
    })
    console.log(result)

    switch (result.platform) {
        case 'android':
            // android result properties
            color = result.vibrant
            break
        case 'web':
            // web result properties
            color = result.lightVibrant
            break
        case 'ios':
            // iOS result properties
            color = result.primary
            break
        default:
            throw new Error('Unexpected platform key')
    }
    return color; 
}