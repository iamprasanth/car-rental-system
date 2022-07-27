import api from "../../config/api";
import axios from "axios";
import { useState, useEffect } from "react";
import { dateFormatter } from '../../helpers/helper'

//Datatable Modules
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import "./orderList.css";

export default function Confirmation({ history }) {

    const user = JSON.parse(localStorage.getItem('user'));
    const car = JSON.parse(localStorage.getItem('selectedCar'));
    const settings = JSON.parse(localStorage.getItem('settings'));

    const [orders, setOrders] = useState([]);
    useEffect(async () => {
        try {
            const { data } = await axios.get(
                api.getOrderList,
            );
            setOrders(data.response)
        } catch (error) {
            console.log(error)
        }
    }, [history]);

    const config = {
        header: {
            "Content-Type": "application/json",
        },
    };

    $('body').on('mousedown', '#isReturned', async function (e) {
        if (!$(this).is(':checked')) {
            var confirmed;
            var orderId = $(this).attr('orderId')
            this.checked = confirmed = window.confirm("Are you sure to complete this order, is the vehicle returned ?");
            $(this).trigger("change");
            if (confirmed) {
                const { data, error } = await axios.post(api.markAsReturned, {
                    "isReturned": true,
                    "_id": orderId
                }, {
                    config,
                });
            }
        }
    });


    setTimeout(function () {
        $('#order-table').DataTable({
            "bDestroy": true,
            order: [[0, 'desc']],
            "ajax": {
                "url": api.getOrderList,
                "dataSrc": ""
            },
            "columns": [
                {
                    "render": function (data, type, content, meta) {
                        return content.orderNumber
                    }
                },
                {
                    "render": function (data, type, content, meta) {
                        return content.carId.make + " " + content.carId.model
                    }
                },
                {
                    "render": function (data, type, content, meta) {
                        return dateFormatter(content.createdAt)
                    }
                },
                {
                    "render": function (data, type, content, meta) {
                        return dateFormatter(content.fromDate)
                    }
                },
                {
                    "render": function (data, type, content, meta) {
                        return dateFormatter(content.toDate)
                    }
                },
                { "data": "totalDays" },
                {
                    "render": function (data, type, content, meta) {
                        return content.totalFare
                    }
                },
                {
                    "render": function (data, type, content, meta) {
                        if (content.isReturned) {
                            return '<input type="checkbox" id="isReturned1" checked>';
                        } else {
                            return '<input type="checkbox" id="isReturned" orderId=' + content._id + ' > ';
                        }
                    }
                },
            ]
        });
    }, 1000);

    return (
        <>
            <div className="container mt-100 confirmation">
                <div className="row  car-listings">
                    <div className="col-12">
                        <table id="order-table" className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Order Number</th>
                                    <th>Car</th>
                                    <th>Order Created On</th>
                                    <th>Service From Date</th>
                                    <th>Service To Date</th>
                                    <th>Total Days</th>
                                    <th>Total Fare</th>
                                    <th>Is car returned ?</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
};
