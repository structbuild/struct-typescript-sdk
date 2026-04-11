import type { components } from "../generated/ws.js";
import type {
	components as alertComponents,
	WsAlertSubscribeMap,
	WsAlertEventDataMap,
	WsAlertEventName,
} from "../generated/ws-alerts.js";

export type WsSchemas = components["schemas"];
export type WsAlertSchemas = alertComponents["schemas"];
export type { WsAlertSubscribeMap, WsAlertEventDataMap, WsAlertEventName };
