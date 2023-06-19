"use client";

import axios from 'axios';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Select from 'react-select'
import api from '@/api/core';
import provinceJson from '@/data/province.json'
import Illustration from '@/components/Illustration';
import HospitalTypeButton from '@/components/HospitalTypeButton'
import HospitalCard from '@/components/HospitalCard';
import { DistrictInterface, DistrictType, ProvincesInterface, ProvincesType } from '@/interfaces/location';
import { HospitalCategoryType, HospitalInterface, HospitalsType } from '@/interfaces/hospital';

export default function Home() {

  const [type, selectedType] = useState<HospitalCategoryType>('non-covid')
  const [provincesData, setProvincesData] = useState<ProvincesType>([])
  const [districtsData, setDisctrictsData] = useState<DistrictType>([])
  const [selectedProvince, setSelectedProvince] = useState<ProvincesInterface>()
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInterface>()
  const [hospitalList, setHospitalList] = useState<HospitalsType>([]);
  const [appLoading, setAppLoading] = useState<boolean>(false);
  const [hospitalDetail, setHospitalDetail] = useState();
  const [isDetailMode, setDetailMode] = useState<boolean>(false);

  const handleFilter = () => {
    setAppLoading(true);
    api
      .get(`/${type}/${selectedProvince?.id}/${selectedDistrict?.id}`)
      .then((res) => {
        setHospitalList(res.data.result);
        setAppLoading(false);
      });
  };


  const handleDetail = (selectedHospital: HospitalInterface) => {
    setAppLoading(true);
    const { hospital_code } = selectedHospital
    api.get(`/bed-detail/${hospital_code}`).then(res => {
      setHospitalDetail(res.data);
      console.log(res.data)
      setDetailMode(true);
      setAppLoading(false);
    });
  };

  const handleOnSelectProvince = async (selectedProvince: ProvincesInterface) => {
    console.log(selectedProvince)
    const { id } = selectedProvince;
    setSelectedProvince(selectedProvince);

    try {
      const districtJson = require(`./data/kabupaten/${id}`)
      console.log(districtJson)
      setDisctrictsData(districtJson);
    } catch (error) {
      // Handle error
    }
  };


  useEffect(() => {
    const retrieveProvinces = async () => {
      try {
        setProvincesData(provinceJson);
      } catch (error) {
        alert('Err')
      }
    };
    
    retrieveProvinces();
  }, []);

  const isDistrictFilled = districtsData.length === 0
  const filterButtonText = appLoading ? 'Memuat ...' : 'Filter'
  return (
    <main className="mx-auto md:w-[480px] w-full h-screen px-5 rounded-2xl border-black">
      <Illustration/>
      <h2 className="d-flex justify-center text-center">Cek Ketersediaan Rumah Sakit</h2>
      <div className="bg-blue-100 rounded-md w-full flex flex-row justify-evenly p-4">
        <HospitalTypeButton type="covid" selectedType={type} onClick={() => selectedType('covid')} />
        <HospitalTypeButton type="non-covid" selectedType={type} onClick={() => selectedType('non-covid')} />
      </div>
      <div className="pt-15 flex flex-col w-full">
        <div className="w-full flex justify-between mb-10">
          <div className="w-full">
            <Select options={provincesData} className="text-xs text-gray-500" id="province" getOptionLabel={(o) => o.nama} getOptionValue={(o) => o.id} onChange={(selected) => selected && handleOnSelectProvince(selected)} placeholder="Provinsi" />
          </div>
          <div className="w-full">
            <Select options={districtsData} className="text-xs text-gray-500" id="kabupaten" getOptionLabel={(o) => o.nama} getOptionValue={(o) => o.id} onChange={(selected) => selected && setSelectedDistrict(selected)
            } isDisabled={isDistrictFilled} placeholder="Kabupaten / Kota" />
          </div>
        </div>
        <button className="border border-blue-200 bg-blue-200 text-blue-600 rounded-md py-2 px-4" onClick={handleFilter} disabled={appLoading}>{filterButtonText}</button>
      </div>
      <div className="p-3 bg-white max-h-[50vh] overflow-y-scroll flex flex-col gap-5">
      {
         hospitalList.map((hospital, idx) => {
            const { hospital_name } = hospital;
            const hospitalKey = idx + hospital_name
            return (
              <HospitalCard key={hospitalKey} hospitalData={hospital} />
            )
          })
        }
      </div>

    </main>
  )
}
