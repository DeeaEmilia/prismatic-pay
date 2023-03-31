// Account class
class Account {
    constructor(owner, movements, interestRate, password) {
        this.owner = owner;
        this.movements = movements;
        this.interestRate = interestRate;
        this.password = password;
        this.username = this.createUsername();
    }

    createUsername() {
        const names = this.owner.toLowerCase().split(' ');
        const firstNameInitial = names[0][0];
        const lastName = names[names.length - 1];

        return firstNameInitial + lastName;
    }
}

export default Account;
