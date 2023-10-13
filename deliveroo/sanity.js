import { SanityClient, createClient } from "@sanity/client";
import ImageUrlBuilder  from "@sanity/image-url";

const client = createClient({
    projectId: 'ny487xeh',
    dataset: "production",
    userCdn: false,
    apiVersion: '2021-08-31'
})

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
export default client;