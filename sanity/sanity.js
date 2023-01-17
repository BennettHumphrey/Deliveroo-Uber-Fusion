import sanityClient from "@sanity/client"
import ImageUrlBuilder from "@sanity/image-url"

const client = sanityClient({
    projectId: 'ah9gfg1w',
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21"
})

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

//RUN THIS to add exception for local host xxxx CORS policy
//sanity cors add http://localhost:xxxx