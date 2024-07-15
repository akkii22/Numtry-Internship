
let id = "no";
        selectData();

        function manageData() {
            document.getElementById('msg').innerHTML = "";
            let firstName = document.getElementById('firstName').value;
            let lastName = document.getElementById('lastName').value;
            let phone = document.getElementById('phone').value;
            let address = document.getElementById('address').value;
            let city = document.getElementById('city').value;

            if (firstName == '' || lastName == '' || phone == '' || address == '' || city == '') {
                document.getElementById('msg').innerHTML = 'Please fill all fields';
            } else {
                let data = {
                    firstName,
                    lastName,
                    phone,
                    address,
                    city
                };

                if (id == 'no') {
                    let arr = getCrudData();
                    if (arr == null) {
                        let dataArr = [data];
                        setCrudData(dataArr);
                    } else {
                        arr.push(data);
                        setCrudData(arr);
                    }
                    document.getElementById('msg').innerHTML = 'Data added';
                } else {
                    let arr = getCrudData();
                    arr[id] = data;
                    setCrudData(arr);
                    document.getElementById('msg').innerHTML = 'Data updated';
                }
                document.getElementById('firstName').value = '';
                document.getElementById('lastName').value = '';
                document.getElementById('phone').value = '';
                document.getElementById('address').value = '';
                document.getElementById('city').value = '';
                selectData();
            }
        }

        function selectData() {
            let arr = getCrudData();
            if (arr != null) {
                let html = '';
                let sno = 1;
                for (let k in arr) {
                    html += `<tr>
                                <td>${sno}</td>
                                <td>${arr[k].firstName}</td>
                                <td>${arr[k].lastName}</td>
                                <td>${arr[k].phone}</td>
                                <td>${arr[k].address}</td>
                                <td>${arr[k].city}</td>
                                <td>
                                    <a href="javascript:void(0)" onclick="editData(${k})">Edit</a>&nbsp;
                                    <a href="javascript:void(0)" onclick="deleteData(${k})">Delete</a>
                                </td>
                             </tr>`;
                    sno++;
                }
                document.getElementById('root').innerHTML = html;
            }
        }

        function editData(rid) {
            id = rid;
            let arr = getCrudData();
            document.getElementById('firstName').value = arr[rid].firstName;
            document.getElementById('lastName').value = arr[rid].lastName;
            document.getElementById('phone').value = arr[rid].phone;
            document.getElementById('address').value = arr[rid].address;
            document.getElementById('city').value = arr[rid].city;
        }

        function deleteData(rid) {
            let arr = getCrudData();
            arr.splice(rid, 1);
            setCrudData(arr);
            selectData();
        }

        function getCrudData() {
            let arr = JSON.parse(localStorage.getItem('crud'));
            return arr;
        }

        function setCrudData(arr) {
            localStorage.setItem('crud', JSON.stringify(arr));
        }
