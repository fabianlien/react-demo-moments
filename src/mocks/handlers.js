import { rest } from "msw"

const baseURL = "https://dj-r-f-api-moments.herokuapp.com/"
export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (request, response, context) => {
        return response(context.json(
            { "pk": 2, "username": "john117", "email": "", "first_name": "", "last_name": "", "profile_id": 2, "profile_image": "https://res.cloudinary.com/budha51/image/upload/v1/media/../default_profile_x3wzpb" }
        ));
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (request, response, context) => {
        return response(context.status(200));
    })
]