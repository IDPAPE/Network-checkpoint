export class Profile {
    constructor(data) {
        this.id = data._id
        this.email = data.email
        this.name = data.name
        this.picture = data.picture
        this.coverImg = data.coverImg
        this.graduated = data.graduated
        this.github = data.github
        this.linkedin = data.linkedin
        this.resume = data.resume
        // TODO add additional properties if needed
    }
}
