import React, { useEffect, useState } from 'react'
import axios from 'axios'
// yarn add formik yup
import { useFormik } from 'formik'
import * as yup from 'yup'

const FormSinhVien = () => {
    const [listSV, setListSV] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const frmRegister = useFormik({
        initialValues: {
            maSinhVien: '',
            tenSinhVien: '',
            soDienThoai: '',
            email: ''
        },
        validationSchema: yup.object().shape({
            maSinhVien: yup.string().required("Mã SV không được để trống!").matches(/^[0-9]+$/, "Mã SV chỉ được chứa ký tự số"),
            tenSinhVien: yup.string().required('HoTen cannot be blank!'),
            soDienThoai: yup.string().required('SĐT cannot be blank!').matches(/^0\d{9}$/, "SĐT phải có đúng 10 chữ số và bắt đầu bằng 0"),
            email: yup.string().required('Email cannot be blank!').email('email is invalid')
        }),
        onSubmit: (value) => {
            console.log(value);
            if (editingIndex !== null){
                let newList = [...listSV];
                newList[editingIndex]=value;
                setListSV(newList);
                setEditingIndex(null);
            } else {
                const existed = listSV.some(sv => sv.maSinhVien ===value.maSinhVien);
            if (existed){
                alert("Mã sinh viên đã tồn tại, vui lòng nhập mã khác!");
                return;
            }
            setListSV([...listSV,value]);
            }
            
        }
    })
    const deleteSinhVien = (maSV) =>{
        const newList = listSV.filter(sv => sv.maSinhVien !== maSV)
        setListSV(newList);
    }
    const renderSinhVien = () => {
        const arrSinhVien =
            listSV.map((item, index) => {
                return <tr key={index}>
                    <td>{item.maSinhVien}</td>
                    <td>{item.tenSinhVien}</td>
                    <td>{item.soDienThoai}</td>
                    <td>{item.email}</td>
                    <td>
                        <button className='btn btn-danger me-2' 
                        onClick={()=>{
                            deleteSinhVien(item.maSinhVien)
                        }}>Delete</button>
                        <button className='btn btn-success'
                        onClick={()=>{
                              frmRegister.setValues(item);
                               setEditingIndex(index);  
                        }}>Edit</button>
                    </td>
                </tr>
            })
        return arrSinhVien;
    }
    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white">
                            <h5 className="mb-0">Thông tin sinh viên</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={frmRegister.handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="maSinhVien" className="form-label">Mã SV</label>
                                        <input id="maSinhVien" name="maSinhVien" className="form-control" placeholder="Nhập mã SV"
                                            onChange={frmRegister.handleChange}
                                            value={frmRegister.values.maSinhVien}  
                                        />
                                        <p className='text text-danger'>{frmRegister.errors.maSinhVien}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="tenSinhVien" className="form-label">Họ tên</label>
                                        <input id="tenSinhVien" name="tenSinhVien" className="form-control" placeholder="Nhập họ tên"
                                            onChange={frmRegister.handleChange}
                                            value={frmRegister.values.tenSinhVien}    />
                                        <p className='text text-danger'>{frmRegister.errors.tenSinhVien}</p>
                                    </div>
                                </div>


                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
                                        <input id="soDienThoai" name="soDienThoai" className="form-control" placeholder="Nhập số điện thoại"
                                            onChange={frmRegister.handleChange} 
                                             value={frmRegister.values.soDienThoai}  />
                                        <p className='text text-danger'>{frmRegister.errors.soDienThoai}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input id="email" name="email" className="form-control" placeholder="Nhập email" onChange={frmRegister.handleChange}
                                         value={frmRegister.values.email}   />
                                        <p className='text text-danger'>{frmRegister.errors.email}</p>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success">
                                    {editingIndex ===null ? "Thêm sinh viên" : "Cập nhật thông tin"}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="card shadow-sm mt-4">
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead >
                                    <tr>
                                        <th scope="col">Mã SV</th>
                                        <th scope="col">Họ tên</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Email</th>
                                        <th scope='col'>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderSinhVien()}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default FormSinhVien