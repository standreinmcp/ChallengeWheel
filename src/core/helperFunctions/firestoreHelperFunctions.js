import firestore from '@react-native-firebase/firestore';

export const fetchEmployees = async () => {
  const db = firestore();
  const employeesCollection = await db.collection('employees').get();
  const employees = {
    data: [],
  };
  employeesCollection.docs.map((item) => employees.data.push(item._data));
  return employees;
};

const getEmployeeId = async (index) => {
  const employees = await firestore().collection('employees').get();
  return employees.docs[index].id;
};

const getEmployeeData = async (index) => {
  const employees = await firestore().collection('employees').get();
  return employees.docs[index]._data;
};

export const updateEmployee = async (index) => {
  const currentEmployee = await getEmployeeData(index);
  const employeeId = await getEmployeeId(index);
  firestore()
    .collection('employees')
    .doc(employeeId)
    .update({
      lastSelected: Date.now(),
      doneShifts: currentEmployee.doneShifts + 1,
    });
};

const employeesList = async () => {
  const employees = await firestore().collection('employees').get();
  const employeesIDs = [];
  employees.docs.forEach((item) => employeesIDs.push(item.id));
  return employeesIDs;
};

export const resetEmployeesList = async () => {
  const employeesIDs = await employeesList();
  for (let index = 0; index < employeesIDs.length; index++) {
    firestore().collection('employees').doc(employeesIDs[index]).update({
      lastSelected: 0,
      doneShifts: 0,
    });
  }
};
