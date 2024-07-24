export default function getStudentsByLocation(student, city) {
  if (!Array.isArray(student)) {
    return [];
  }
  return student.filter((student) => student.location === city);
}
