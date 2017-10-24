const expect = require("expect");
const {Users} = require("./users");

describe("users", ()=>{
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'room1'
		},{
			id: '2',
			name: 'Adi',
			room: 'room2'
		},{
			id: '3',
			name: 'Ionut',
			room: 'room1'
		}]
	})


	it("should add new user", ()=>{

		var user = {
			id: "123",
			name: "adi",
			room: "shieit"
		}

		var respUser = users.addUser(user.id, user.name, user.room);
		expect(respUser).toInclude(user);
		expect(users.users.length).toBe(4);
	})


	it("should return names for members in room1", ()=>{
		var userList = users.getUserList("room1");

		expect(userList.length).toBe(2);
		expect(userList).toInclude(users.users[0].name);
		expect(userList).toInclude(users.users[2].name);
	})


	it("should return names for members in room2", ()=>{
		var userList = users.getUserList("room2");

		expect(userList.length).toBe(1);
		expect(userList).toInclude(users.users[1].name);
	})

	it("should remove user", ()=>{
		var user = users.removeUser('1');

		expect(user).toNotBe(null);
		expect(user.name).toBe("Mike");
		expect(users.users.length).toBe(2);
		expect(users.users[0].id).toBe('2');
	})

	it("should not remove user", ()=>{
		var user = users.removeUser('990909');

		expect(user).toNotExist;
		expect(users.users.length).toBe(3);
		expect(users.users[0].id).toBe('1');
	})

	it("should find user", () => {
		var user = users.getUser(users.users[0].id);

		expect(user.name).toBe(users.users[0].name);
		expect(user.id).toBe(users.users[0].id)
	})

	it("should not find user", () => {
		var user = users.getUser('9999');

		expect(user).toNotExist();
	})
})