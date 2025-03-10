import {create} from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useFormStorage = create(
    persist(
        (set)=>({
            tipoLicenciaData:{},
            solicitanteData:{},
            representanteData:{},
            establecimientoData:{},
            ubicacionData:{},
            declaracionData:{},

            updateTipoLicencia: (data) => set((state) => ({tipoLicenciaData: {...state.tipoLicenciaData, ...data}})),
            updateSolicitanteData: (data) => set((state) => ({solicitanteData:{...state.solicitanteData, ...data}})),
            updateRepresentanteData: (data) => set((state) => ({representanteData:{...state.representanteData, ...data}})),
            updateEstablecimientoData: (data) => set((state) => ({establecimientoData:{...state.establecimientoData, ...data}})),
            updateUbicacionData: (data) => set((state) => ({ubicacionData:{...state.ubicacionData, ...data}})),
            updateDeclaracionData: (data) => set((state) => ({declaracionData:{...state.declaracionData, ...data}})),

            resetFormulario: () => set({
                tipoLicenciaData:{},
                solicitanteData:{},
                representanteData:{},
                establecimientoData:{},
                ubicacionData:{},
                declaracionData:{},
            })
        }),{
            name: 'formStorage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                tipoLicenciaData: state.tipoLicenciaData,
                solicitanteData: state.solicitanteData,
                representanteData: state.representanteData,
                establecimientoData: state.establecimientoData,
                ubicacionData: state.ubicacionData,
                declaracionData: state.declaracionData,
            })
        }
    ));