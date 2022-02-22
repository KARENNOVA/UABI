import React from 'react';
import { Table } from 'antd';
import { EditableCell, EditableRow } from './EditableCell';
import { actions } from '../../acquisitions/redux';


type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    key: React.Key;
    number: string;
    area: number;
}

interface EditableTableState {
    dataSource: DataType[];
    count: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;



export class TableDivideAreas extends React.Component<any, EditableTableState> {
    columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];


    constructor(props: EditableTableProps) {
        super(props);

        this.columns = [
            {
                title: 'No.',
                dataIndex: 'number',
                width: '20%',
            },
            {
                title: 'Area',
                dataIndex: 'area',
                width: '30%',
                editable: true,
            },

        ];

        this.state = {
            dataSource: [...this.props.dataSource,],
            count: 2,
        };
    }

    handleSave = (row: DataType) => {
        if (row.area >= this.props.total_area) {
            return this.state.dataSource
        }

        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        // let total = 0
        // newData.map(d => total = total + Number(d.area))
        // console.log(total)
        // if (total > this.props.total_area) {
        //     console.log('mayor')
        // }
        this.setState({ dataSource: newData });

    };

    divideAreas = async (newRealEstates) => {
        console.log(newRealEstates)
        let realestateCreate = newRealEstates.filter((r, i) => i !== 0)
        try {
            // const result = await Promise.all(
            //     realestateCreate.map(async (d,) => {
            //         return await this.props.dispatch(actions.createRealEstate(d))
            //     })
            // )
            // if (result) {
            //     await this.props.dispatch(actions.updateRealEstate(newRealEstates[0], newRealEstates[0].id))
            // }

            const realEstateEdit = {
                id: newRealEstates[0].id,
                active_code: newRealEstates[0].active_code,
                total_area: newRealEstates[0].plot_area + newRealEstates[0].construction_area,
                plot_area: newRealEstates[0].plot_area,
                construction_area: newRealEstates[0].construction_area,
            }

            const result = await this.props.dispatch(actions.createRealEstates(realestateCreate, realEstateEdit, "divide", "many"))
            this.props.setShowTable(false);
            this.props.setNumberAreas(2)
            this.setState({ dataSource: [] })
            this.props.close()
            return Promise.resolve();

        } catch (error) {
            return Promise.reject();

        }

    }

    total = () => {
        let total = 0;
        this.state.dataSource.map(d => {
            return total = total + Number(d.area)
        })
        return total;
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

        // console.log(prevState.dataSource)
        // prevState.dataSource.map((data, i) => {
        //     if (data.number === "Total") {
        //         prevState.dataSource[i] = { key: i + 1, number: i + 1, area: '0' }
        //     }
        //     return prevState.dataSource
        // })
        // if( prevState.dataSource.length > this.props.numberAreas){
        //     prevState.dataSource.pop();
        //     console.log('eliminar ultimo')
        // }
        // console.log(prevState.dataSource)
        if (prevProps.dataSource.length !== this.props.dataSource.length) {
            if (this.props.dataSource.length < prevState.dataSource.length) {
                for (let i = 0; i < this.props.dataSource.length; i++) {
                    this.props.dataSource[i] = prevState.dataSource[i]
                }

            } else {
                for (let i = 0; i < prevState.dataSource.length; i++) {
                    this.props.dataSource[i] = prevState.dataSource[i]
                }
            }
            // this.props.dataSource[this.props.dataSource.length] = { key: '', number: 'Total', area: '' }
            // console.log(this.props.dataSource)
            this.setState({ dataSource: [...this.props.dataSource] })
        }
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record: DataType) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <>
                <div>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns as ColumnTypes}
                        pagination={false}
                    />
                </div>
                <table>
                    <thead >
                        <tr>
                            <th style={{ border: '1px solid #f0f0f0', width: "260px", padding: '8px' }}>TOTAL</th>
                            {(this.total() < this.props.total_area || this.total() > this.props.total_area)
                                ?
                                <th style={{ border: '1px solid #f0f0f0', width: "392px", padding: '8px', color: 'red' }}>{this.total()}</th>
                                :
                                <th style={{ border: '1px solid #f0f0f0', width: "392px", padding: '8px' }}>{this.total()}</th>
                            }
                        </tr>
                    </thead>
                </table>
                <div className="my-3">
                    se debe utilizar todo el Área para poder hacer la división
                </div>
                <hr className='mt-4' />
                <div className="bg-white d-flex flex-row justify-content-between">
                    <div className="flex-fill" />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginRight: '10px' }}
                        key="2"
                        onClick={() => {
                            this.props.setShowTable(false);
                            this.props.setNumberAreas(2)
                            this.setState({ dataSource: [] })
                            this.props.close()
                        }}
                    >
                        cancelar
                    </button>
                    <button

                        type="submit"
                        className="btn btn-primary"
                        key="1"
                        disabled={this.total() !== this.props.total_area ? true : false}
                        onClick={() => {

                            let newRealEstates = []
                            const codigos = this.props.formik.values.active_code.split(',');
                            // const codigos = "GC0005L, GC0005MJ".split(',');
                            console.log(codigos)
                            const codePlot = codigos.filter((cod) => cod.charAt(cod.length - 1) === 'L');
                            const codeConstruction = codigos.filter((cod) => cod.charAt(cod.length - 1) !== 'L');
                            const materials = this.props.formik.values.materials.join(",")
                            console.log(this.props.formik.values)
                            for (let i = 0; i < this.props.numberAreas; i++) {
                                if (this.props.type === "Lote") {
                                    newRealEstates.push({
                                        ...this.props.formik.values,
                                        plot_area: Number(this.state.dataSource[i].area),
                                        active_code: `${codigos[0]}-${i + 1}`, /*`${codePlot[0]}-${i + 1}` ,*/
                                        materials,
                                        projects_id: [this.props.formik.values.projects_id],
                                        type: 'divide_areas'
                                    })
                                } else {
                                    newRealEstates.push({
                                        ...this.props.formik.values,
                                        construction_area: Number(this.state.dataSource[i].area),
                                        active_code: `${codeConstruction[0]}-${i + 1}`,
                                        materials,
                                        projects_id: [this.props.formik.values.projects_id],
                                        type: 'divide_areas'
                                    })
                                }
                            }
                            this.divideAreas(newRealEstates)
                        }}
                    >
                        Guardar
                    </button>
                </div>

            </>
        );
    }
}
