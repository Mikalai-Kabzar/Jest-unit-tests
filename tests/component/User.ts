// User.ts
export enum Status {
    Outdated = 'outdated',
    Regular = 'regular',
    VIP = 'vip',
    Admin = 'admin',
  }
  
  export class User {
    id: string; // Added id attribute
    firstName: string;
    lastName: string;
    age: number;
    money: number;
    children: User[];
    petName: string;
    address: string;
    postCode: string;
    status: Status;
  
    constructor(
      id: string, // Added id attribute
      firstName: string,
      lastName: string,
      age: number,
      money: number,
      children: User[] = [],
      petName: string,
      address: string,
      postCode: string,
      status: Status
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.money = money;
      this.children = children;
      this.petName = petName;
      this.address = address;
      this.postCode = postCode;
      this.status = status;
    }

    getTotalMoney(): number {
        let totalMoney = this.money;
    
        this.children.forEach((child) => {
          totalMoney += child.money;
        });
    
        return totalMoney;
      }
    
      // Function to check if the user is eligible for a discount based on their status
      isEligibleForDiscount(): boolean {
        if (this.status === Status.VIP || this.status === Status.Admin) {
          return true;
        } else {
          return false;
        }
      }

      incrementAgeUntil(targetAge: number): void {
        while (this.age < targetAge) {
          this.age++;
        }
      }
    
      // Function to categorize users based on their age
      categorizeUserByAge(): string {
        if (this.age < 18) {
          return 'Child';
        } else if (this.age >= 18 && this.age < 60) {
          return 'Adult';
        } else {
          return 'Senior';
        }
      }

       // Method to check if the user is a teenager
        isTeenager(): boolean {
            return this.age >= 13 && this.age <= 19;
        }

        // Method to check if the user is a senior citizen
        isSeniorCitizen(): boolean {
            return this.age >= 65;
        }

        // Method to calculate retirement age
        calculateRetirementAge(): number {
            return 65;
        }

        calculateYearsToRetired(): number {
            const retirementAge = this.calculateRetirementAge();
            return Math.max(0, retirementAge - this.age);
        }

        proposeNewStatus(): Status {
        if (this.money < 1000) {
            return Status.Outdated;
        } else if (this.money < 5000) {
            return Status.Regular;
        } else if (this.money < 10000) {
            return Status.VIP;
        } else {
            return Status.Admin;
        }
        }

        
  }
  